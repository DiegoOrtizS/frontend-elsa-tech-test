"use client";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/app/actions";
import { TError } from "@/domain/errors/ErrorFactory";
import { useGlobalContext } from "@/app/context";
import { InputPasswordReveal } from "@/app/components/Password";
import { userMe } from "@/services/elsa_back/user/get";
import { login } from "@/services/elsa_back/auth/login";


export function LoginForm(): JSX.Element {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { openAlertMessage, setUser, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await login({
                email,
                password
            });
            await setCookie({
                name: "token",
                value: response.access
            });
            const resp = await userMe();
            setUser({
                role: resp.role,
                firstName: resp.user.firstName,
                lastName: resp.user.lastName,
                email: resp.user.email,
            });
            router.push("/dashboard");
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message
                });
            }
        } finally {
            setOpenLoading(false);
        }
    };

    return (
        <div>
            <Box
                component="form"
                onSubmit={async (e: React.FormEvent<Element>): Promise<void> => {
                    e.preventDefault();
                    await submitForm();
                }}
                sx={{
                    padding: "20px"
                }}
            >
                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    type="email"
                    size="small"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setEmail(e.target.value);
                    }}
                />
                <InputPasswordReveal 
                    placeholder="Contraseña"
                    modifyPassword={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setPassword(e.target.value);
                        }
                    }
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    className="my-3"
                >
                    Iniciar sesión
                </Button>
            </Box>
        </div>
    );
}
