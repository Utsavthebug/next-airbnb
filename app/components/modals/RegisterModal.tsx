'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from 'react-icons/fc'
import {useCallback,useState} from 'react'

import { useForm, SubmitHandler,FieldValues } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading,setIsLoading] = useState(false)
    
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    }  = useForm<FieldValues>({
        defaultValues:{
           name:'',
           email:'',
           password:'' 
        }
    });

    const onSubmit :SubmitHandler<FieldValues> = (data) =>  {
        console.log(data)
    } 

    const bodyContent = (
        <div className="flex flex-col gap-4">
        <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
        />
        <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />


        <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />


        <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />

        </div>
    )

    const footerContent = (
        <div className=" flex flex-col gap-4 mt-3">
            <hr />
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={()=>{}}
            />
        </div>
    )

  
    return (
   <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Register"
    actionLabel="Continue"
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}  
    body={bodyContent}
    footer={footerContent}
   />
  )
}

export default RegisterModal