"use client";
import { Form } from "../../admin/crud-adoptions/components/Form";
import { useGlobalContext } from "@/app/context";

export default function Dashboard(): JSX.Element {
    const { user } = useGlobalContext();

    return (
        <Form
            adopterIdPrev={user?.id}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setShouldRefresh={(): void => {}}
        />
    );
}
