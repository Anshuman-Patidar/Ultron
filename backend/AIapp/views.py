from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import AIapp_model
from .serializers import AI_serializers
from .utils import askAi

@api_view(['GET'])
def hi(request):
    return Response(
        {
            "status": "online",
            "message": "Hi! Ultron AI backend API is live.",
            "version": "1.0.0"
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def ask(request):
    name = (request.data.get('name') or '').strip()
    question = (request.data.get('question') or '').strip()

    if not name or not question:
        return Response(
            {"error": "Both 'name' and 'question' fields are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        ai_response = askAi(f"Hello, I am {name} and I want to ask you a question: {question}")
    except Exception as e:
        return Response(
            {
                "error": "Failed to get response from AI service.",
                "details": str(e)
            },
            status=status.HTTP_502_BAD_GATEWAY
        )

    # Persist the conversation to the database
    entry = AIapp_model.objects.create(
        name=name,
        question=question,
        ai_response=ai_response
    )

    return Response(
        {
            "id": entry.id,
            "message": f"Got it, {name}! Here is your answer.",
            "name": name,
            "question": question,
            "ai_response": ai_response,
            "created_at": entry.created_at
        },
        status=status.HTTP_200_OK
    )


@api_view(['GET', 'DELETE'])
def history(request):
    name = request.query_params.get('name', '').strip()
    
    if request.method == 'DELETE':
        if name:
            deleted_count, _ = AIapp_model.objects.filter(name=name).delete()
        else:
            deleted_count, _ = AIapp_model.objects.all().delete()
        return Response(
            {"message": f"Successfully deleted {deleted_count} history records."},
            status=status.HTTP_200_OK
        )

    queryset = AIapp_model.objects.all()
    if name:
        queryset = queryset.filter(name=name)
    
    # Return up to 30 most recent items (ordered by -created_at)
    serializer = AI_serializers(queryset[:30], many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

