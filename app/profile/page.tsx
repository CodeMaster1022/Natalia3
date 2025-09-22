'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector, useAppDispatch } from '@/lib/hooks/redux';
import { ProfileFormData, LegalGuardian, SocialMedia } from '@/lib/types/profile';
import { getProfile, createProfile, updateProfile, uploadProfilePhoto, clearProfileError } from '@/lib/store/profileSlice';
import { User, Calendar, Phone, Mail, MapPin, Plus, X, Camera, Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { debugAuth } from '@/lib/utils/debugAuth';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { profile, isLoading: profileLoading, error } = useAppSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    idNumber: '',
    gender: 'prefer_not_to_say',
    birthday: '',
    photo: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      tiktok: ''
    },
    legalGuardian: []
  });

  const [newGuardian, setNewGuardian] = useState<LegalGuardian>({
    firstname: '',
    lastname: '',
    idNumber: '',
    relationship: 'parent',
    phone: '',
    gender: 'prefer_not_to_say',
    email: '',
    address: '',
    country: ''
  });

  const [showAddGuardian, setShowAddGuardian] = useState(false);

  // Load profile data on mount
  useEffect(() => {
    // Debug authentication in development
    if (process.env.NODE_ENV === 'development') {
      debugAuth();
    }
    dispatch(getProfile());
  }, [dispatch]);

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        firstname: profile.firstname || user?.firstname || '',
        lastname: profile.lastname || user?.lastname || '',
        idNumber: profile.idNumber || '',
        gender: profile.gender || 'prefer_not_to_say',
        birthday: profile.birthday ? profile.birthday.split('T')[0] : '', // Convert to YYYY-MM-DD format
        photo: profile.photo || '',
        socialMedia: {
          facebook: profile.socialMedia?.facebook || '',
          twitter: profile.socialMedia?.twitter || '',
          tiktok: profile.socialMedia?.tiktok || ''
        },
        legalGuardian: profile.legalGuardian || []
      });
    }
  }, [profile, user]);

  // Update form data when user data changes (if no profile exists)
  useEffect(() => {
    if (!profile && user) {
      setFormData(prev => ({
        ...prev,
        firstname: user.firstname || prev.firstname,
        lastname: user.lastname || prev.lastname
      }));
    }
  }, [user, profile]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearProfileError());
    };
  }, [dispatch]);

  // Calculate age from birthday
  const calculateAge = (birthday: string) => {
    if (!birthday) return null;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(formData.birthday);
  const isMinor = age !== null && age < 18;

  const handleInputChange = (field: keyof ProfileFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: keyof SocialMedia, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleGuardianChange = (field: keyof LegalGuardian, value: any) => {
    setNewGuardian(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addGuardian = () => {
    if (!newGuardian.firstname || !newGuardian.lastname || !newGuardian.email || !newGuardian.phone) {
      toast.error('Please fill in all required guardian fields');
      return;
    }

    setFormData(prev => ({
      ...prev,
      legalGuardian: [...prev.legalGuardian, newGuardian]
    }));

    setNewGuardian({
      firstname: '',
      lastname: '',
      idNumber: '',
      relationship: 'parent',
      phone: '',
      gender: 'prefer_not_to_say',
      email: '',
      address: '',
      country: ''
    });

    setShowAddGuardian(false);
    toast.success('Guardian added successfully');
  };

  const removeGuardian = (index: number) => {
    setFormData(prev => ({
      ...prev,
      legalGuardian: prev.legalGuardian.filter((_, i) => i !== index)
    }));
    toast.success('Guardian removed');
  };

  const handleSave = async () => {
    if (!formData.firstname || !formData.lastname || !formData.idNumber || !formData.birthday) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isMinor && formData.legalGuardian.length === 0) {
      toast.error('Legal guardian information is required for users under 18');
      return;
    }

    setIsLoading(true);
    try {
      if (profile) {
        // Update existing profile
        await dispatch(updateProfile(formData)).unwrap();
        toast.success('Profile updated successfully');
      } else {
        // Create new profile
        await dispatch(createProfile(formData)).unwrap();
        toast.success('Profile created successfully');
      }
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error || 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      await dispatch(uploadProfilePhoto(file)).unwrap();
      toast.success('Photo uploaded successfully');
    } catch (error: any) {
      toast.error(error || 'Failed to upload photo');
    }
  };

  const getInitials = (firstname: string, lastname: string) => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  // Show loading state while fetching profile
  if (profileLoading && !profile) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#49BBBD] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading profile...</p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600 mt-1">Manage your personal information</p>
              </div>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading || profileLoading} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {isLoading || profileLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture & Basic Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Avatar className="w-32 h-32 mx-auto">
                        <AvatarImage src={formData.photo} />
                        <AvatarFallback className="text-2xl">
                          {formData.firstname && formData.lastname 
                            ? getInitials(formData.firstname, formData.lastname)
                            : user?.firstname?.charAt(0).toUpperCase() || 'U'
                          }
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handlePhotoUpload(file);
                              }
                            }}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Button
                            size="sm"
                            className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                            onClick={() => document.getElementById('photo-upload')?.click()}
                            disabled={profileLoading}
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">
                        {formData.firstname && formData.lastname 
                          ? `${formData.firstname} ${formData.lastname}`
                          : user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : 'User'
                        }
                      </h3>
                      <p className="text-gray-600">{user?.email}</p>
                      {age !== null && (
                        <div className="mt-2">
                          <Badge variant={isMinor ? "destructive" : "secondary"}>
                            {age} years old {isMinor && '(Minor)'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                                  </CardContent>
                </Card>
              
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstname">First Name *</Label>
                      <Input
                        id="firstname"
                        value={formData.firstname}
                        onChange={(e) => handleInputChange('firstname', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastname">Last Name *</Label>
                      <Input
                        id="lastname"
                        value={formData.lastname}
                        onChange={(e) => handleInputChange('lastname', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="idNumber">ID Number *</Label>
                      <Input
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={(e) => handleInputChange('idNumber', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your ID number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange('gender', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="birthday">Birthday *</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => handleInputChange('birthday', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Connect your social media profiles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.socialMedia.facebook}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://facebook.com/yourprofile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input
                      id="twitter"
                      value={formData.socialMedia.twitter}
                      onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://twitter.com/yourprofile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input
                      id="tiktok"
                      value={formData.socialMedia.tiktok}
                      onChange={(e) => handleSocialMediaChange('tiktok', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://tiktok.com/@yourprofile"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Legal Guardians */}
              <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Legal Guardians
                          {isMinor && <Badge variant="destructive">Required for minors</Badge>}
                        </CardTitle>
                        <CardDescription>
                          {isMinor ? 'Legal guardian information is required for users under 18' : 'Your legal guardian information'}
                        </CardDescription>
                      </div>
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddGuardian(true)}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Guardian
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.legalGuardian.map((guardian, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            {guardian.firstname} {guardian.lastname}
                          </h4>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeGuardian(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>ID Number:</strong> {guardian.idNumber}</p>
                          <p><strong>Gender:</strong> {guardian.gender}</p>
                          <p><strong>Relationship:</strong> {guardian.relationship}</p>
                          <p><strong>Phone:</strong> {guardian.phone}</p>
                          <p><strong>Email:</strong> {guardian.email}</p>
                          <p><strong>Address:</strong> {guardian.address}</p>
                          <p><strong>Country:</strong> {guardian.country}</p>
                        </div>
                      </div>
                    ))}

                    {/* Add Guardian Form */}
                    {showAddGuardian && isEditing && (
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Add New Guardian</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAddGuardian(false)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>First Name *</Label>
                            <Input
                              value={newGuardian.firstname}
                              onChange={(e) => handleGuardianChange('firstname', e.target.value)}
                              placeholder="Guardian's first name"
                            />
                          </div>
                          <div>
                            <Label>Last Name *</Label>
                            <Input
                              value={newGuardian.lastname}
                              onChange={(e) => handleGuardianChange('lastname', e.target.value)}
                              placeholder="Guardian's last name"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>ID Number *</Label>
                            <Input
                              value={newGuardian.idNumber}
                              onChange={(e) => handleGuardianChange('idNumber', e.target.value)}
                              placeholder="Guardian's ID number"
                            />
                          </div>
                          <div>
                            <Label>Gender *</Label>
                            <Select
                              value={newGuardian.gender}
                              onValueChange={(value) => handleGuardianChange('gender', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Relationship *</Label>
                            <Select
                              value={newGuardian.relationship}
                              onValueChange={(value) => handleGuardianChange('relationship', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="legal_guardian">Legal Guardian</SelectItem>
                                <SelectItem value="grandparent">Grandparent</SelectItem>
                                <SelectItem value="uncle">Uncle</SelectItem>
                                <SelectItem value="aunt">Aunt</SelectItem>
                                <SelectItem value="sibling">Sibling</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Phone *</Label>
                            <Input
                              value={newGuardian.phone}
                              onChange={(e) => handleGuardianChange('phone', e.target.value)}
                              placeholder="Guardian's phone number"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            value={newGuardian.email}
                            onChange={(e) => handleGuardianChange('email', e.target.value)}
                            placeholder="Guardian's email address"
                          />
                        </div>

                        <div>
                          <Label>Address *</Label>
                          <Textarea
                            value={newGuardian.address}
                            onChange={(e) => handleGuardianChange('address', e.target.value)}
                            placeholder="Guardian's address"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label>Country *</Label>
                          <Input
                            value={newGuardian.country}
                            onChange={(e) => handleGuardianChange('country', e.target.value)}
                            placeholder="Guardian's country"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={addGuardian} size="sm">
                            Add Guardian
                          </Button>
                          <Button variant="outline" onClick={() => setShowAddGuardian(false)} size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 