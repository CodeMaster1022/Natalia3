'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { 
  CreditCard,
  Shield,
  Check,
  Star,
  Clock,
  Users,
  BookOpen,
  ArrowLeft,
  Lock,
  Zap,
  Gift,
  Percent,
  AlertCircle,
  CheckCircle,
  Crown,
  Infinity
} from 'lucide-react';

// Demo course data (would come from API in real app)
const courseData: { [key: string]: any } = {
  'advanced-conversation': {
    id: 'advanced-conversation',
    title: 'Advanced Conversation Mastery',
    description: 'Take your speaking skills to the next level with advanced conversation techniques',
    instructor: 'Prof. Emily Davis',
    originalPrice: 79.99,
    currentPrice: 49.99,
    discount: 38,
    rating: 4.9,
    students: 8765,
    lessons: 32,
    duration: '8 weeks',
    features: [
      'HD video lessons',
      'Interactive exercises',
      'Personal feedback',
      'Certificate of completion',
      'Lifetime access',
      'Mobile app access'
    ]
  },
  'business-english': {
    id: 'business-english',
    title: 'Business English Essentials',
    description: 'Professional English skills for workplace success',
    instructor: 'James Wilson',
    originalPrice: 129.99,
    currentPrice: 79.99,
    discount: 38,
    rating: 4.8,
    students: 9876,
    lessons: 40,
    duration: '10 weeks',
    features: [
      'Professional vocabulary',
      'Business communication',
      'Presentation skills',
      'Email writing',
      'Meeting participation',
      'Industry-specific content'
    ]
  }
};

const pricingPlans = [
  {
    id: 'individual',
    name: 'Individual Course',
    description: 'Perfect for focused learning',
    price: null, // Will be set based on selected course
    originalPrice: null,
    features: [
      'Single course access',
      'Lifetime access to course',
      'Certificate of completion',
      'Mobile app access',
      'Community forum access'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Monthly',
    description: 'Access all courses with monthly flexibility',
    price: 29.99,
    originalPrice: 39.99,
    features: [
      'Access to all courses',
      'New courses added monthly',
      'Priority support',
      'Advanced analytics',
      'Offline downloads',
      'Cancel anytime'
    ],
    popular: true
  },
  {
    id: 'annual',
    name: 'Annual Subscription',
    description: 'Best value for serious learners',
    price: 199.99,
    originalPrice: 359.88,
    savings: 159.89,
    features: [
      'Access to all courses',
      'New courses added monthly',
      'Priority support',
      'Advanced analytics',
      'Offline downloads',
      '2 months free',
      'Exclusive content'
    ],
    popular: false
  }
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, American Express' },
  { id: 'paypal', name: 'PayPal', icon: Shield, description: 'Pay securely with your PayPal account' },
];

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams?.get('course');
  
  const [selectedPlan, setSelectedPlan] = useState('individual');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const selectedCourse = courseId ? courseData[courseId] : null;

  useEffect(() => {
    if (courseId && selectedCourse) {
      // Update individual plan pricing based on selected course
      pricingPlans[0].price = selectedCourse.currentPrice;
      pricingPlans[0].originalPrice = selectedCourse.originalPrice;
    }
  }, [courseId, selectedCourse]);

  const handleInputChange = (field: string, value: string) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyCoupon = () => {
    // Demo coupon logic
    if (couponCode.toUpperCase() === 'SAVE20') {
      setAppliedCoupon({
        code: 'SAVE20',
        discount: 20,
        type: 'percentage'
      });
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setAppliedCoupon({
        code: 'WELCOME10',
        discount: 10,
        type: 'fixed'
      });
    } else {
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const calculateTotal = () => {
    const selectedPlanData = pricingPlans.find(plan => plan.id === selectedPlan);
    if (!selectedPlanData) return 0;
    
    let price = selectedPlanData.price || 0;
    
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        price = price * (1 - appliedCoupon.discount / 100);
      } else {
        price = Math.max(0, price - appliedCoupon.discount);
      }
    }
    
    return price;
  };

  const handlePayment = async () => {
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to success page or course
      if (selectedPlan === 'individual' && courseId) {
        router.push(`/my-lessons/${courseId}?enrolled=true`);
      } else {
        router.push('/my-lessons?subscribed=true');
      }
    }, 3000);
  };

  const selectedPlanData = pricingPlans.find(plan => plan.id === selectedPlan);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
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
              <h1 className="text-3xl font-bold text-slate-900">Complete Your Purchase</h1>
              <p className="text-slate-600">Secure checkout powered by industry-leading encryption</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Info (if individual course) */}
              {selectedCourse && selectedPlan === 'individual' && (
                <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#49BBBD]" />
                      Course Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="w-20 h-16 bg-gradient-to-br from-[#49BBBD]/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-[#49BBBD]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{selectedCourse.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">by {selectedCourse.instructor}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {selectedCourse.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {selectedCourse.students.toLocaleString()} students
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {selectedCourse.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Pricing Plans */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#49BBBD]" />
                    Choose Your Plan
                  </CardTitle>
                  <CardDescription>Select the plan that best fits your learning goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                    {pricingPlans.map((plan) => {
                      const isSelected = selectedPlan === plan.id;
                      const price = plan.price || selectedCourse?.currentPrice || 0;
                      const originalPrice = plan.originalPrice || selectedCourse?.originalPrice || 0;
                      
                      return (
                        <div key={plan.id} className={`relative p-6 border rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-[#49BBBD] bg-[#49BBBD]/5' 
                            : 'border-slate-200 hover:border-slate-300'
                        } ${plan.popular ? 'ring-2 ring-[#49BBBD]/20' : ''}`}>
                          {plan.popular && (
                            <Badge className="absolute -top-2 left-4 bg-[#49BBBD]">Most Popular</Badge>
                          )}
                          
                          <div className="flex items-start gap-4">
                            <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <Label htmlFor={plan.id} className="text-lg font-semibold cursor-pointer">
                                    {plan.name}
                                  </Label>
                                  <p className="text-sm text-slate-600">{plan.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-slate-900">
                                    ${price.toFixed(2)}
                                  </div>
                                  {originalPrice > price && (
                                    <div className="text-sm text-slate-500 line-through">
                                      ${originalPrice.toFixed(2)}
                                    </div>
                                  )}
                                  {plan.savings && (
                                    <div className="text-sm text-green-600 font-medium">
                                      Save ${plan.savings.toFixed(2)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2 mt-4">
                                {plan.features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#49BBBD]" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>Choose how you'd like to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-4 mb-6">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div key={method.id} className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id 
                            ? 'border-[#49BBBD] bg-[#49BBBD]/5' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}>
                          <RadioGroupItem value={method.id} id={method.id} />
                          <IconComponent className="w-5 h-5 text-slate-600" />
                          <div>
                            <Label htmlFor={method.id} className="font-medium cursor-pointer">{method.name}</Label>
                            <p className="text-sm text-slate-500">{method.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {/* Billing Information */}
                  {selectedPaymentMethod === 'card' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Billing Information</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={billingInfo.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="bg-white/70"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={billingInfo.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="bg-white/70"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={billingInfo.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-white/70"
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={billingInfo.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="bg-white/70"
                        />
                      </div>

                      <Separator />

                      <h4 className="font-semibold text-slate-900">Card Information</h4>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={billingInfo.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="bg-white/70"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={billingInfo.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className="bg-white/70"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={billingInfo.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="bg-white/70"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          value={billingInfo.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="bg-white/70"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#49BBBD]" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Details */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{selectedPlanData?.name}</h4>
                    <p className="text-sm text-slate-600 mb-4">{selectedPlanData?.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-medium">${selectedPlanData?.price?.toFixed(2) || '0.00'}</span>
                      </div>
                      
                      {selectedPlanData?.originalPrice && selectedPlanData.originalPrice > (selectedPlanData.price || 0) && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${(selectedPlanData.originalPrice - (selectedPlanData.price || 0)).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon ({appliedCoupon.code})</span>
                          <span>
                            -{appliedCoupon.type === 'percentage' 
                              ? `${appliedCoupon.discount}%` 
                              : `$${appliedCoupon.discount.toFixed(2)}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Coupon Code */}
                  <div>
                    <Label htmlFor="coupon" className="text-sm font-medium">Have a coupon?</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="coupon"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="bg-white/70"
                        disabled={!!appliedCoupon}
                      />
                      {appliedCoupon ? (
                        <Button variant="outline" onClick={removeCoupon} className="px-3">
                          <Check className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={applyCoupon} className="px-3">
                          Apply
                        </Button>
                      )}
                    </div>
                    {appliedCoupon && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Coupon applied successfully!
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#49BBBD]">${calculateTotal().toFixed(2)}</span>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={setAgreeToTerms}
                    />
                    <Label htmlFor="terms" className="text-sm text-slate-600 leading-5">
                      I agree to the <a href="#" className="text-[#49BBBD] hover:underline">Terms of Service</a> and <a href="#" className="text-[#49BBBD] hover:underline">Privacy Policy</a>
                    </Label>
                  </div>

                  {/* Payment Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-[#49BBBD] to-blue-500 hover:from-[#3da5a7] hover:to-blue-600 text-lg py-6"
                    onClick={handlePayment}
                    disabled={isProcessing || !agreeToTerms}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Complete Purchase
                      </>
                    )}
                  </Button>

                  {/* Security Notice */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                    <Shield className="w-4 h-4" />
                    <span>Secured by 256-bit SSL encryption</span>
                  </div>

                  {/* Money Back Guarantee */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium text-sm">30-Day Money-Back Guarantee</span>
                    </div>
                    <p className="text-xs text-green-600">
                      Not satisfied? Get a full refund within 30 days, no questions asked.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
