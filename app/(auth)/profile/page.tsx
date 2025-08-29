'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  // This would be replaced with actual user data from authentication
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatar-placeholder.png',
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-medium">
                {mockUser.name.charAt(0)}
              </div>
            </Avatar>
            <div>
              <CardTitle>{mockUser.name}</CardTitle>
              <CardDescription>{mockUser.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Your Polls</h3>
              <p className="text-sm text-muted-foreground">Manage your created polls</p>
              <Button className="mt-2" variant="outline">
                View My Polls
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-sm text-muted-foreground">Update your profile information</p>
              <Button className="mt-2" variant="outline">
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}