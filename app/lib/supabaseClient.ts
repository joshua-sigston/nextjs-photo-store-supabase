import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

export const supabaseClient = createClientComponentClient()

