"use server"

import { supabaseServer } from "../lib/supabaseServer"
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function extractFilePath(url: string): string{
    const parts = url.split('/user_uploads/')
    if (parts.length < 2){
        console.error('Invalid URL format')
        return ''
    }
    let filePath = parts[1];
    if (filePath.includes('?')){
        filePath = filePath.split('?')[0]
    }
    return 'user_uploads/' + filePath
}

export async function deletePhoto(formData: FormData) {
  let src = formData.get('photoPath') as string

  if (!src) {
    return { success: false, error: 'Photo path not provided' };
}
 
  const filePath = extractFilePath(src)
  const cookieStore = cookies();
  console.log({filePath})
    const {data, error} = await supabaseServer.storage.from('photos').remove([filePath])
    console.log(data, error)

    if (error){
        return {success: false, error}
    }
    revalidatePath('/dashboard')
    return {success: true}
}