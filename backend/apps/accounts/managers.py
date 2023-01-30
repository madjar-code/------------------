from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    
    def create_user(self, email, first_name, last_name, password=None):

        if email is None:
            raise TypeError('Users should have a email')
        
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None):
  
        if password is None:
            raise TypeError('Password should not be none')
        
        user = self.create_user(email=email, password=password, first_name="", last_name="")
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

