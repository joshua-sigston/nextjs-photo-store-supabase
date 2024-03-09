"use server"

import { supabaseServer } from "../lib/supabaseServer"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export async function favorites(formData: FormData) {
  const photoName = formData.get('photoName')
  const isFavored = formData.get('isFavored')

  const {data, error} = await supabaseServer.auth.getSession()

  const user = data?.session?.user;
  // console.log(user)

  if (!user) return {success: false, error: 'User is not authenticated'}

  if (isFavored === 'true') {
    const {error} = await supabaseServer
      .from('favorites')
      .delete()
      .match({user_id: user.id, photo_name: photoName})
    
    if(error) {
      console.log(error)
      return {success: false, error}
    }
  } else {
    const {error} = await supabaseServer
    .from('favorites')
    .insert([{user_id: user.id, photo_name: photoName}])

    if (error){
      console.log(error)
      return {success: false, error}
    }
  }

  revalidatePath('/photos')
  revalidatePath('/favorites')

  return {success: true}
}