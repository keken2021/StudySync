import { useQuery } from "@tanstack/react-query";

export const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

 export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
    queryFn: fetchUsers,
})};