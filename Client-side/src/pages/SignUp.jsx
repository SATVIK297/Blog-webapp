import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import {  useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
import OAuth from "../components/OAuth"




const SignUp = () => {

  const [formData , setFormData]=  useState({})
  const [errorMessage , setErrorMessage]  =useState(null);
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e)=>{

    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* {left side} */}
        <div className="flex-1">
        <Link to="/" className=' text-xxl font-bold dark:text-white text-4xl' > 
          <span className='px-2 py-1 bg-gradient-to-r from-blue-400 via-teal-500 to-green-400 rounded-lg text-white'>InspireLog</span>
          </Link>
          <p className='text-xl mt-5 font-black '>
           INSPIRE THE WORLD 
          </p>
        </div>

        {/* Right side */}
        <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username' 
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email' 
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password' 
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
              
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && 
          <Alert className="mt-5"> {errorMessage}</Alert>
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp