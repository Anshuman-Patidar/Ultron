from rest_framework import serializers
from .models import AIapp_model
class AI_serializers(serializers.ModelSerializer):
    class Meta:
        model=AIapp_model
        fields='__all__'