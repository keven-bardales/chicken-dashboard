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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import * as React from 'react';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { useBreedStore } from '@/app/dashboard/breeds/stores/breed.store';
import { CurrencyInput } from '@/components/ui/currency-input';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Calendar } from '@/components/ui/calendar';
import { fi } from 'date-fns/locale';
import { differenceInDaysBetweenDates } from '@/lib/difference-in-days-between-dates';

const formSchema = z.object({
  name: z.string().min(3).max(255)
});

export default function ScenarioCreate() {
  const [open, setOpen] = React.useState(false);
  const breeds = useBreedStore((state) => state.getAllBreeds());

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      quantity: 5555,
      breedId: 1,
      name: 'Pollos',
      expectedStartDate: new Date(),
      expectedEndDate: new Date(),
      days: 0
    }
  });

  form.watch();

  return (
    <div className="flex flex-col gap-y-5">
      <Form {...form}>
        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel>Raza</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-fill justify-between"
                        >
                          {form.getValues().breedId?.toString()
                            ? breeds.find(
                                (breed) =>
                                  breed.id?.toString() ==
                                  form.getValues().breedId?.toString()
                              )?.name
                            : 'Selecciona una raza...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar raza..." />
                          <CommandList>
                            <CommandEmpty>
                              No se encontraron resultados
                            </CommandEmpty>
                            <CommandGroup>
                              {breeds.map((breed) => (
                                <CommandItem
                                  key={breed.name}
                                  value={breed.id?.toString()}
                                  onSelect={(currentValue) => {
                                    setOpen(false);
                                    form.setValue(
                                      'breedId',
                                      Number(currentValue)
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      form?.getValues()?.breedId?.toString() ==
                                        breed.id?.toString()
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {breed.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Seleccione la raza que desea utilizar en su escenario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form?.control}
            name="quantity"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cantidad de pollos</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      {...field}
                      placeholder="Ingrese la cantidad de su escenario"
                      onNumberChange={(value) => {
                        form.setValue('quantity', value as number);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese la cantidad de pollos que desea en su escenario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form?.control}
            name="expectedStartDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Fecha esperada de inicio</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              new Intl.DateTimeFormat('es-ES', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              }).format(field.value)
                            ) : (
                              <span>Escoja una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Ingrese la fecha que desea iniciar su escenario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form?.control}
            name="expectedEndDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Fecha esperada de finalización</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              new Intl.DateTimeFormat('es-ES', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              }).format(field.value)
                            ) : (
                              <span>Escoja una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Ingrese la fecha que desea finalizar su escenario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form?.control}
            name="days"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Duración en dias</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      readOnly
                      {...field}
                      placeholder="Duración en dias"
                      onNumberChange={(value) => {
                        form.setValue('days', value as number);
                      }}
                      value={
                        differenceInDaysBetweenDates(
                          new Date(form.getValues().expectedStartDate),
                          new Date(form.getValues().expectedEndDate)
                        ) as number
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Se calcula la diferencia en dias
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
