'use client';

import { Button } from '@/core/components/ui/Button';
import { TextField } from '@/core/components/ui/TextField';
import type { RegisterData } from '@/types';
import {useForm} from 'react-hook-form';
import {z} from "zod";
import {useAuth} from "@/features/auth/hooks/useAuth";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";

const registerSchema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    password_confirmation: z.string().min(8, 'La confirmation du mot de passe est requise'),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
});

export function RegisterForm() {
    const { register: registerUser, isLoading } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const onSubmit = async (data: RegisterData) => {
        const success = await registerUser(data);
        if (success) {
            router.push('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <TextField
                    label="Nom"
                    type="text"
                    {...register('name')}
                    error={errors.name?.message}
                />
            </div>

            <div>
                <TextField
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                />
            </div>

            <div>
                <TextField
                    label="Mot de passe"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                />
            </div>

            <div>
                <TextField
                    label="Confirmer le mot de passe"
                    type="password"
                    {...register('password_confirmation')}
                    error={errors.password_confirmation?.message}
                />
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
                S'inscrire
            </Button>
        </form>
    );
}