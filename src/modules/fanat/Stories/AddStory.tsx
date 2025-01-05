import React from 'react';
import { Input } from '@/components/ui/fanat/input';
import { Label } from '@/components/ui/fanat/label';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import DatePicker from '@/components/ui/date-picker2';
import { Card } from '@/components/ui/fanat/card';
import { DateTimePicker24h } from '@/components/ui/fanat/data-time-picker2';
import { TimePicker24h } from '@/components/ui/fanat/time-picker';
import { Button } from '@/components/ui/fanat/button';
import {
    Calendar,
    ImagePlay,
    Clock,
    Tally5,
    X,
    Plus,
    User,
} from 'lucide-react';
import { SelectComponent } from '@/components/ui/fanat/select-component';
import { Switch } from '@/components/ui/switch';

const AddStory = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    return (
        <div className="flex flex-col sm:flex-row gap-4 max-w-[1000px] mx-auto">
            <div className="flex flex-col gap-4">
                <Card className="p-4  sm:w-[480px] h-full">
                    <div className="flex   flex-col gap-2 ">
                        <Label className="flex gap-1 items-center">
                            <Calendar className="w-4" />
                            Date
                            <span className="text-red">*</span>
                        </Label>

                        <DateTimePicker24h date={date} setDate={setDate} />
                    </div>
                </Card>{' '}
                <Card className=" sm:w-[480px] p-4 flex flex-col gap-2 flex-grow h-full">
                    <Label
                        className="flex gap-1 items-center"
                        htmlFor="picture"
                    >
                        <User className="w-4" />
                        Creators<span className="text-red">*</span>
                    </Label>
                    <SelectComponent field="exampleField" />
                    <Label
                        className="flex gap-1 items-center"
                        htmlFor="picture"
                    >
                        <Clock className="w-4" />
                        Length<span className="text-red">*</span>
                    </Label>

                    <TimePicker24h />
                    <Label
                        className="flex gap-1 items-center"
                        htmlFor="picture"
                    >
                        <Tally5 className="w-4" />
                        Count<span className="text-red">*</span>
                    </Label>
                    <Input id="picture" type="number" />
                </Card>
            </div>
            <Card className="p-4 flex-grow grig flex flex-col gap-4 ">
                <Label className=" flex items-center gap-2">
                    <ImagePlay className="w-4" />
                    Content
                    <span className="text-red">1/3</span>
                </Label>
                <div className="flex gap-2 ">
                    <div className="rounded-lg max-w-full h-[200px] relative overflow-hidden ">
                        <X className="absolute top-2 right-2 w-6 h-6 bg-blue rounded-full p-1" />
                        <img
                            className="max-w-full max-h-full"
                            src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp"
                            alt=""
                        />
                    </div>

                    <div className="border p-4 border-border rounded-lg bg-blue cursor-pointer flex justify-center items-center">
                        <Plus className="!opacity-100" />
                    </div>
                </div>
                <Button className="mt-auto">Shedule</Button>
            </Card>
        </div>
    );
};

export default AddStory;
