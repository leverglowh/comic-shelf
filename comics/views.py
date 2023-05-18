from django.contrib.auth import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Issue, Series, User, UserReadIssue, get_read_comics

def serialize_user(user):
    return {
        'id': user.id,
        'username': user.username,
        'read_comics': get_read_comics(user, limit=10)
    }

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user:
            # Create or retrieve the token
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': serialize_user(user)
            })
        else:
            return Response({'error': 'Authentication failed.'} ,status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def user(request, username):
    if request.method == 'GET':
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(serialize_user(user))


@api_view(['GET', 'POST'])
def user_comics(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(get_read_comics(user, limit=0))

    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def read_comic(request):
    user = request.user
    if request.method == 'POST':
        # request_data = request.data
        for request_data in request.data:
            series_id = request_data.get('series')
            issue_id_list = request_data.get('issues')

            try:
                series = Series.objects.get(pk=series_id)
            except Series.DoesNotExist:
                series = Series(id=series_id)
                series.save()
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            for issue_id in issue_id_list:
                try:
                    issue = Issue.objects.get(pk=issue_id)
                except Issue.DoesNotExist:
                    issue = Issue(id=issue_id, series_fk=series)
                    issue.save()

                if UserReadIssue.objects.filter(user=user, issue=issue).exists():
                    continue
                
                try:
                    user_read_issue = UserReadIssue(user=user, issue=issue)
                    user_read_issue.save()
                except:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
