import NextAuth from 'next-auth'
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/app/libs/prismadb'
import { compare } from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions : NextAuthOptions ={
adapter:PrismaAdapter(prisma),
   providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      }),
      CredentialsProvider({
        id:'credentials',
        name:'credentials',
        credentials:{
            email:{
                label:'Email',
                type:'text'
            },
            password:{
                label:'Password',
                type:'password'
            }
        },
        async authorize(credentials, req) {
            if(!credentials?.email || !credentials?.password){
                throw new Error("Email and Password required")
            }
            const user = await prisma.user.findUnique({
                where:{
                    email:credentials.email
                }
            })
            if(!user || !user.hashedPassword){
                throw new Error('Email does not exists')
            }
        
            const isCorrectPassword = await compare(credentials.password,user.hashedPassword)

            if(!isCorrectPassword){
                throw new Error('Incorrect Email or Password')
            }


            return user
        },
    }),
    
   ],
   pages:{
    signIn:'/'
   } ,
   debug:process.env.NODE_ENV==='development',
   session:{
    strategy:'jwt'
   }
 }

const handler=NextAuth(authOptions)

export {handler as GET , handler as POST}