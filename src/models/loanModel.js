import { supabase } from '../config/supabase.js';

export async function getAllLoans(status) {
  let query = supabase
    .from('loans')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  return await query;
}

export async function getLoanById(id) {
  return await supabase
    .from('loans')
    .select('*')
    .eq('id', id)
    .maybeSingle();
}

export async function createLoan(loanData) {
  return await supabase
    .from('loans')
    .insert(loanData)
    .select()
    .single();
}

export async function updateLoan(id, loanData) {
  return await supabase
    .from('loans')
    .update(loanData)
    .eq('id', id)
    .select()
    .single();
}

export async function deleteLoan(id) {
  return await supabase
    .from('loans')
    .delete()
    .eq('id', id)
    .select()
    .single();
}