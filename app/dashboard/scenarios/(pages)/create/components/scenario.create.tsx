'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3).max(255)
});

export default function ScenarioCreate() {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  return (
    <div className="flex flex-col gap-y-5">
      <Form {...form}>
        <div className="grid w-full grid-cols-4 gap-5">
          <FormField
            control={form?.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre de escenario</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ingrese el nombre de su escenario"
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese un nombre descriptivo para su escenario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form?.control}
            name="breedId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Raza</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={'outline'} role="combobox"></Button>
                      </FormControl>
                    </PopoverTrigger>
                  </Popover>
                  <FormDescription>
                    Seleccione la raza que desea utilizar en su escenario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
        </div>
      </Form>
    </div>
  );
}
