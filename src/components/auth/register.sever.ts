"use server";
import { directusBot } from "@/services/directus";
import { createUser } from '@directus/sdk';

export async function createUserAccount(data: any) {
    try {
      const appendedData = { ...data, 'role': process.env.DIRECTUS_BASE_USER_ROLE ?? 'user' };
      const client = directusBot();
      await client.request(createUser(appendedData));
      return { success: 'User account created successfully. Redirecting...' };
    } 
    catch (error: any) {
      if (error.errors[0].message === 'Value for field "email" in collection "directus_users" has to be unique.') {
        return { error: 'Account already exists. Please login or reset password.' };
      }
      if (error.errors[0].message === 'Validation failed for field "password". Value doesn\'t have the correct format.') {
        return { error: 'A stronger password is required.' };
      }
      if (error.response?.status === 200) {
        return { success: 'User account created successfully.' };
      }
      return { error: error.errors[0].message, status: error.response?.status };
    }
}