"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import { loginUser, registerUser, clearError } from "@/lib/store/authSlice"
import { toast } from "sonner"
import authImage from "@/public/image/auth.png"
import registerImage from "@/public/image/register.png"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user, router])

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  // Show success toast
  useEffect(() => {
    if (user && isAuthenticated) {
      toast.success(`Welcome back, ${user.firstname} ${user.lastname}!`)
    }
  }, [user, isAuthenticated])

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long"
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number"
    }
    return null
  }

  const validateName = (name: string) => {
    if (name.length < 2 || name.length > 50) {
      return "Name must be between 2 and 50 characters"
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes"
    }
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap()
      router.push("/dashboard")
    } catch (error) {
      // Error is handled by useEffect above
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields")
      return
    }

    // Validate firstname
    const firstnameError = validateName(firstname)
    if (firstnameError) {
      toast.error(`First name: ${firstnameError}`)
      return
    }

    // Validate lastname
    const lastnameError = validateName(lastname)
    if (lastnameError) {
      toast.error(`Last name: ${lastnameError}`)
      return
    }

    // Validate password
    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      await dispatch(registerUser({ 
        firstname, 
        lastname,
        email, 
        password, 
        confirmPassword 
      })).unwrap()
      router.push("/dashboard")
    } catch (error) {
      // Error is handled by useEffect above
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setFirstname("")
    setLastname("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    dispatch(clearError())
  }

  return (
    <div className="bg-white flex items-center justify-center">
      <div className="bg-white shadow-2xl overflow-hidden w-full grid grid-cols-1 lg:grid-cols-2 h-screen items-center">
        {/* Left side - Image */}
        <div className="relative bg-white flex flex-col justify-end hidden lg:flex h-screen">
          <Image
            src={activeTab === "login" ? authImage : registerImage}
            alt="Students in classroom"
            className="absolute inset-0 w-full h-full object-cover rounded-lg lg:rounded-2xl xl:rounded-3xl px-2 py-2 lg:px-4 lg:py-4"
          />
          <div className="absolute inset-0" />
          <div className="relative z-10 text-white pl-6 lg:pl-12 mb-4 lg:mb-6">
            <h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-4 lg:mb-6 text-balance">Lorem Ipsum is simply</h2>
            <p className="text-sm lg:text-base xl:text-lg opacity-90">Lorem Ipsum is simply...</p>
          </div>
        </div>

        {/* Right side - Login/Register Form */}
        <div className="p-4 lg:p-6 xl:p-8 2xl:p-12 flex flex-col justify-center min-h-[600px] lg:min-h-auto">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 mb-4 lg:mb-6 xl:mb-8 text-center text-balance">
              Welcome to lorem.!
            </h1>

            {/* Tab Toggle */}
            <div className="bg-teal-100 rounded-full p-1 mb-4 lg:mb-6 xl:mb-8 flex">
              <button
                onClick={() => handleTabChange("login")}
                className={`flex-1 py-2 lg:py-2.5 xl:py-3 px-3 lg:px-4 xl:px-6 rounded-full text-sm font-medium transition-all ${
                  activeTab === "login" ? "bg-teal-500 text-white shadow-md" : "text-teal-600 hover:text-teal-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleTabChange("register")}
                className={`flex-1 py-2 lg:py-2.5 xl:py-3 px-3 lg:px-4 xl:px-6 rounded-full text-sm font-medium transition-all ${
                  activeTab === "register" ? "bg-teal-500 text-white shadow-md" : "text-teal-600 hover:text-teal-700"
                }`}
              >
                Register
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4 lg:mb-6 xl:mb-8 leading-relaxed text-pretty">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>

            <form 
              className="space-y-3 lg:space-y-4 xl:space-y-6"
              onSubmit={activeTab === "login" ? handleLogin : handleRegister}
            >
              <div className="min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] flex flex-col justify-between">
                {activeTab === "login" ? (
                  <div className="space-y-3 lg:space-y-4 xl:space-y-6">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black w-full px-4 py-2 lg:py-2.5 xl:py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm lg:text-base"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="text-black w-full px-4 py-2 lg:py-2.5 xl:py-3 pr-12 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm lg:text-base"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex-1" />

      
                    {/* Login Button */}
                    <Button
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 lg:py-2.5 xl:py-3 rounded-full font-medium transition-colors text-sm lg:text-base disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 lg:space-y-4 xl:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name Field */}
                      <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input
                          id="firstname"
                          type="text"
                          placeholder="Enter your first name"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          className="text-black w-full px-4 py-2 lg:py-2.5 xl:py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm lg:text-base"
                          disabled={isLoading}
                        />
                      </div>

                      {/* Last Name Field */}
                      <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          id="lastname"
                          type="text"
                          placeholder="Enter your last name"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          className="text-black w-full px-4 py-2 lg:py-2.5 xl:py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm lg:text-base"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black w-full px-4 py-2 lg:py-2.5 xl:py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm lg:text-base"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="reg-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="text-black w-full px-4 py-2 lg:py-2.5 xl:py-3 pr-12 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm lg:text-base"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="text-black w-full px-4 py-2 lg:py-2.5 xl:py-3 pr-12 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm lg:text-base"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Register Button */}
                    <Button
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 lg:py-2.5 xl:py-3 rounded-full font-medium transition-colors text-sm lg:text-base disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
