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
import { User, Calendar, Phone, Mail, MapPin, Plus, X, Camera, Save, ArrowLeft, Shield, Users, Globe, Edit3, Check, AlertCircle, Loader2 } from 'lucide-react';
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
  const [photoUploading, setPhotoUploading] = useState(false);
  
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
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    social: false,
    guardians: false
  });

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
    if (!newGuardian.firstname || !newGuardian.lastname || !newGuardian.email || !newGuardian.phone || !newGuardian.idNumber) {
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
    setPhotoUploading(true);
    try {
      await dispatch(uploadProfilePhoto(file)).unwrap();
      toast.success('Photo uploaded successfully');
    } catch (error: any) {
      toast.error(error || 'Failed to upload photo');
    } finally {
      setPhotoUploading(false);
    }
  };

  const getInitials = (firstname: string, lastname: string) => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getCompletionPercentage = () => {
    const fields = [
      formData.firstname,
      formData.lastname,
      formData.idNumber,
      formData.birthday,
      formData.gender !== 'prefer_not_to_say' ? formData.gender : '',
      formData.photo,
      formData.socialMedia.facebook || formData.socialMedia.twitter || formData.socialMedia.tiktok,
      isMinor ? formData.legalGuardian.length > 0 : true
    ];
    
    const completed = fields.filter(field => field && field !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  // Show loading state while fetching profile
  if (profileLoading && !profile) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-[#49BBBD] mx-auto"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#49BBBD]/20 to-blue-500/20 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 font-medium">Loading your profile...</p>
                  <p className="text-sm text-slate-500">This won't take long</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center gap-2 hover:bg-white/60 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    My Profile
                  </h1>
                  <p className="text-slate-600">Manage your personal information and preferences</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    className="bg-gradient-to-r from-[#49BBBD] to-blue-500 hover:from-[#3da5a7] hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="hover:bg-slate-50 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      disabled={isLoading || profileLoading} 
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                    >
                      {isLoading || profileLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Completion Progress */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-[#49BBBD]/20 to-blue-500/20 rounded-lg">
                      <User className="w-4 h-4 text-[#49BBBD]" />
                    </div>
                    <span className="font-semibold text-slate-700">Profile Completion</span>
                  </div>
                  <Badge variant={getCompletionPercentage() === 100 ? "default" : "secondary"} className="font-medium">
                    {getCompletionPercentage()}%
                  </Badge>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#49BBBD] to-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  Complete your profile to unlock all features
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Profile Picture & Basic Info */}
            <div className="lg:col-span-1">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center space-y-6">
                    <div className="relative inline-block">
                      <div className="relative">
                        <Avatar className="w-32 h-32 mx-auto ring-4 ring-white/50 shadow-2xl">
                          <AvatarImage src={formData.photo} className="object-cover" />
                          <AvatarFallback className="text-2xl bg-gradient-to-br from-[#49BBBD] to-blue-500 text-white">
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
                              className="absolute -bottom-2 -right-2 rounded-full w-12 h-12 p-0 bg-gradient-to-r from-[#49BBBD] to-blue-500 hover:from-[#3da5a7] hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-200"
                              onClick={() => document.getElementById('photo-upload')?.click()}
                              disabled={photoUploading}
                            >
                              {photoUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Camera className="w-4 h-4" />
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {formData.firstname && formData.lastname 
                            ? `${formData.firstname} ${formData.lastname}`
                            : user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : 'User'
                          }
                        </h3>
                        <p className="text-slate-600 flex items-center justify-center gap-2 mt-1">
                          <Mail className="w-4 h-4" />
                          {user?.email}
                        </p>
                      </div>
                      
                      {age !== null && (
                        <div className="flex justify-center">
                          <Badge 
                            variant={isMinor ? "destructive" : "secondary"} 
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            <Calendar className="w-3 h-3" />
                            {age} years old {isMinor && '(Minor)'}
                          </Badge>
                        </div>
                      )}

                      {isMinor && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center gap-2 text-amber-800">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Guardian Required</span>
                          </div>
                          <p className="text-xs text-amber-700 mt-1">
                            Legal guardian information is mandatory for users under 18
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Profile Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Personal Information */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader 
                  className="cursor-pointer select-none hover:bg-white/20 transition-colors duration-200 rounded-t-lg"
                  onClick={() => toggleSection('personal')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Personal Information</CardTitle>
                        <CardDescription>Your basic personal details and identification</CardDescription>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${expandedSections.personal ? 'rotate-180' : ''}`}>
                      <ArrowLeft className="w-5 h-5 text-slate-400 -rotate-90" />
                    </div>
                  </div>
                </CardHeader>
                
                {expandedSections.personal && (
                  <CardContent className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstname" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstname"
                          value={formData.firstname}
                          onChange={(e) => handleInputChange('firstname', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter your first name"
                          className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastname" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastname"
                          value={formData.lastname}
                          onChange={(e) => handleInputChange('lastname', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter your last name"
                          className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="idNumber" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          ID Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="idNumber"
                          value={formData.idNumber}
                          onChange={(e) => handleInputChange('idNumber', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter your ID number"
                          className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          Gender <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => handleInputChange('gender', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200">
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

                    <div className="space-y-2">
                      <Label htmlFor="birthday" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        Birthday <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="birthday"
                        type="date"
                        value={formData.birthday}
                        onChange={(e) => handleInputChange('birthday', e.target.value)}
                        disabled={!isEditing}
                        className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Social Media */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader 
                  className="cursor-pointer select-none hover:bg-white/20 transition-colors duration-200 rounded-t-lg"
                  onClick={() => toggleSection('social')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Social Media</CardTitle>
                        <CardDescription>Connect your social media profiles</CardDescription>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${expandedSections.social ? 'rotate-180' : ''}`}>
                      <ArrowLeft className="w-5 h-5 text-slate-400 -rotate-90" />
                    </div>
                  </div>
                </CardHeader>
                
                {expandedSections.social && (
                  <CardContent className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <Label htmlFor="facebook" className="text-sm font-medium text-slate-700">Facebook</Label>
                      <Input
                        id="facebook"
                        value={formData.socialMedia.facebook}
                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://facebook.com/yourprofile"
                        className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="text-sm font-medium text-slate-700">Twitter/X</Label>
                      <Input
                        id="twitter"
                        value={formData.socialMedia.twitter}
                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://twitter.com/yourprofile"
                        className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktok" className="text-sm font-medium text-slate-700">TikTok</Label>
                      <Input
                        id="tiktok"
                        value={formData.socialMedia.tiktok}
                        onChange={(e) => handleSocialMediaChange('tiktok', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://tiktok.com/@yourprofile"
                        className="bg-white/50 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Legal Guardians */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader 
                  className="cursor-pointer select-none hover:bg-white/20 transition-colors duration-200 rounded-t-lg"
                  onClick={() => toggleSection('guardians')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                          Legal Guardians
                          {isMinor && <Badge variant="destructive" className="text-xs">Required for minors</Badge>}
                        </CardTitle>
                        <CardDescription>
                          {isMinor ? 'Legal guardian information is required for users under 18' : 'Your legal guardian information'}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAddGuardian(true);
                          }}
                          className="flex items-center gap-2 hover:bg-white/60 transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                          Add Guardian
                        </Button>
                      )}
                      <div className={`transform transition-transform duration-200 ${expandedSections.guardians ? 'rotate-180' : ''}`}>
                        <ArrowLeft className="w-5 h-5 text-slate-400 -rotate-90" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedSections.guardians && (
                  <CardContent className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                    {formData.legalGuardian.map((guardian, index) => (
                      <div key={index} className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-200 rounded-xl space-y-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-[#49BBBD]/20 to-blue-500/20 rounded-lg">
                              <Users className="w-4 h-4 text-[#49BBBD]" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900 text-lg">
                                {guardian.firstname} {guardian.lastname}
                              </h4>
                              <Badge variant="outline" className="mt-1 capitalize bg-orange-400 text-white">
                                {guardian.relationship.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeGuardian(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <User className="w-4 h-4" />
                              <span><strong>ID Number:</strong> {guardian.idNumber}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <span><strong>Gender:</strong> {guardian.gender}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Phone className="w-4 h-4" />
                              <span><strong>Phone:</strong> {guardian.phone}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Mail className="w-4 h-4" />
                              <span><strong>Email:</strong> {guardian.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin className="w-4 h-4" />
                              <span><strong>Address:</strong> {guardian.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Globe className="w-4 h-4" />
                              <span><strong>Country:</strong> {guardian.country}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Enhanced Add Guardian Form */}
                    {showAddGuardian && isEditing && (
                      <div className="p-6 border-2 border-dashed border-[#49BBBD]/30 bg-gradient-to-r from-[#49BBBD]/5 to-blue-500/5 rounded-xl space-y-6 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-[#49BBBD]/20 to-blue-500/20 rounded-lg">
                              <Plus className="w-4 h-4 text-[#49BBBD]" />
                            </div>
                            <h4 className="font-semibold text-slate-900 text-lg">Add New Guardian</h4>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAddGuardian(false)}
                            className="hover:bg-white/60 transition-all duration-200"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                              First Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={newGuardian.firstname}
                              onChange={(e) => handleGuardianChange('firstname', e.target.value)}
                              placeholder="Guardian's first name"
                              className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                              Last Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={newGuardian.lastname}
                              onChange={(e) => handleGuardianChange('lastname', e.target.value)}
                              placeholder="Guardian's last name"
                              className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                              ID Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={newGuardian.idNumber}
                              onChange={(e) => handleGuardianChange('idNumber', e.target.value)}
                              placeholder="Guardian's ID number"
                              className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                              Gender <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={newGuardian.gender}
                              onValueChange={(value) => handleGuardianChange('gender', value)}
                            >
                              <SelectTrigger className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                              Relationship <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={newGuardian.relationship}
                              onValueChange={(value) => handleGuardianChange('relationship', value)}
                            >
                              <SelectTrigger className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200">
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
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                              Phone <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              value={newGuardian.phone}
                              onChange={(e) => handleGuardianChange('phone', e.target.value)}
                              placeholder="Guardian's phone number"
                              className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="email"
                            value={newGuardian.email}
                            onChange={(e) => handleGuardianChange('email', e.target.value)}
                            placeholder="Guardian's email address"
                            className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            Address <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            value={newGuardian.address}
                            onChange={(e) => handleGuardianChange('address', e.target.value)}
                            placeholder="Guardian's address"
                            rows={2}
                            className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200 resize-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            Country <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={newGuardian.country}
                            onChange={(e) => handleGuardianChange('country', e.target.value)}
                            placeholder="Guardian's country"
                            className="bg-white/70 border-slate-200 focus:border-[#49BBBD] focus:ring-[#49BBBD]/20 transition-all duration-200"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button 
                            onClick={addGuardian} 
                            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Guardian
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAddGuardian(false)}
                            className="hover:bg-slate-50 transition-all duration-200"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 