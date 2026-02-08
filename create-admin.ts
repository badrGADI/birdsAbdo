import { supabase } from './lib/supabase';

const email = 'admin@theworldofbirds.com'; // Change this if you want
const password = 'ChangeThisPassword123!'; // Change this!

async function createAdmin() {
  console.log(`Creating user: ${email}...`);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('User created successfully:', data.user);
    console.log('IMPORTANT: You may need to confirm the email in your inbox, or disable email confirmation in Supabase Dashboard -> Authentication -> Providers -> Email -> Confirm Email.');
  }
}

createAdmin();
