'use client';

import { Button } from '@/core/components/ui/Button';
import { TextField } from '@/core/components/ui/TextField';
import type { LoginCredentials } from '@/types';
import {useForm, UseFormReturn} from 'react-hook-form';
import {z} from "zod";
import {useAuth} from "@/features/auth/hooks/useAuth";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export function LoginForm() {
    const { login, isLoading } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginCredentials) => {
        const success = await login(data);
        if (success) {
            router.push('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <Button type="submit" fullWidth isLoading={isLoading}>
                Se connecter
            </Button>
        </form>
    );
}