import './App.css'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useStepForms } from './hooks/useStepForms'

import { Form1 } from './form1'
import { Form2 } from './form2'
import { Form3 } from './form3'

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2 } from 'lucide-react';

import axios from "axios";

const formSchema = z.object({
  emailId: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string()
    .regex(/^(.*?[^A-Za-z0-9]){2,}.*$/, 'Atleast 2 Special Characters')
    .regex(/^(.*?[A-Z]){2,}.*$/, 'Atleast 2 Capital Letters')
    .regex(/^(.*?[a-z]){2,}.*$/, 'Atleast 2 small Letters')
    .regex(/^(.*?[0-9]){2,}.*$/, 'Atleast 2 Numbers'),
  firstName: z.string()
    .min(2, 'Minimum 2 Characters required')
    .max(50, 'Maximum 50 Characters allowerd')
    .regex(/^[A-Za-z\s]+$/, 'Only Alphabets are allowed'),
  lastName: z.string()
    .regex(/^[A-Za-z]+$/, 'Only Alphabets are allowed')
    .optional()
    .or(z.literal('')),
  address: z.string().min(10, 'Minimum 10 Chars required'),
  countryCode: z.string(),
  phoneNumber: z.string()
    .regex(/^\d+$/, 'Only Numbers are allowed')
    .length(10,'Invalid number, should be exactly 10 digits'),
  acceptTermsAndCondition: z.boolean()
})

export type formSchemaType = z.infer<typeof formSchema>;

function App() {
  const { toast } = useToast()

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
  } = useStepForms(3);

  const form1 = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailId: "",
      password: ""
    }
  })

  const onSubmit = async (values: formSchemaType) => {
    // ✅ This will be type-safe and validated.
    axios.post('https://codebuddy.review' + '/submit',{
      "emailId": values.emailId,
      "password": values.password,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "address": values.address,
      "countryCode": values.countryCode,
      "phoneNumber": values.phoneNumber
    })
    .then(resp => {
      console.log("Response : ",resp);
      toast({
        title: "Form Submited",
        description: "",
        action: (
          <ToastAction altText="Acknowledge">Okay</ToastAction>
        ),
      })
    })
    .catch(err=>{
      console.log(err);
      toast({
        variant: "destructive",
        title: "Form Submission Failed",
        description: `Error: ${err.message}`,
        action: (
          <ToastAction altText="Acknowledge" onClick={handleFormSaveAndNext}>Retry</ToastAction>
        ),
      })
    })
  }

  const handleFormSave = async (event: React.MouseEvent<HTMLElement>) => {
    console.log("handleFormSave :",currentStepIndex);
    event.preventDefault();
    if(currentStepIndex == 3) {
      form1.handleSubmit(onSubmit)();
    } else if ( currentStepIndex == 1 ) {
      await form1.trigger('emailId');
      await form1.trigger('password');
    } else if ( currentStepIndex == 2 ) {
      await form1.trigger('firstName');
      await form1.trigger('lastName');
      await form1.trigger('address');
    }
    toast({
      title: (<div className='flex justify-center items-center'><CheckCircle2 className='mr-2 text-green-500'/><div>Details Saved</div></div>),
    })
  }

  const handleFormSaveAndNext = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await handleFormSave(event);
    if(currentStepIndex == 3) {
      return;
    } else if ( currentStepIndex == 1 ) {
      if(form1.getFieldState('emailId').invalid || form1.getFieldState('password').invalid) {
        return;
      }
    } else if ( currentStepIndex == 2 ) {
      if(form1.getFieldState('firstName').invalid || form1.getFieldState('lastName').invalid || form1.getFieldState('address').invalid ) {
        return;
      }
    }
    nextStep();
  }

  return (
    <div className='mx-10'>
      <div className="w-full flex items-center justify-center flex-col">
        <div className='m-5 w-2/3 flex justify-between'>
          <Button type='button' variant={currentStepIndex == 1 ? 'default' : 'outline'} onClick={()=> goTo(1)}>Step 1</Button>
          <Button type='button' variant={currentStepIndex == 2 ? 'default' : 'outline'} onClick={()=> goTo(2)}>Step 2</Button>
          <Button type='button' variant={currentStepIndex == 3 ? 'default' : 'outline'} onClick={()=> goTo(3)}>Step 3</Button>
        </div>
        <Card className='w-full'>
          <CardContent className='w-full mt-5'>
            <Form {...form1}>
              <form onSubmit={form1.handleSubmit(onSubmit)} className="space-y-8">
                {currentStepIndex == 1 && <div><Form1 form={form1} /></div>}
                {currentStepIndex == 2 && <div><Form2 form={form1} /></div>}
                {currentStepIndex == 3 && <div><Form3 form={form1} setValue={form1.setValue}/></div>}
                <div className='space-x-2 flex justify-end'>
                  <Button onClick={(e)=>{e.preventDefault(); previousStep()}} disabled={isFirstStep} >Back</Button>
                  <Button onClick={handleFormSave}>Save</Button>
                  <Button onClick={handleFormSaveAndNext} disabled={isLastStep}>Save and Next</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}

export default App