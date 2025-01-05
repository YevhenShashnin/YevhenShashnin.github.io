import React from 'react';
import { Input } from '@/components/ui/fanat/input';
import { Label } from '@/components/ui/fanat/label';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import DatePicker from '@/components/ui/date-picker';
import { Card } from '@/components/ui/fanat/card';
import { DateTimePicker24h } from '@/components/ui/fanat/data-time-picker';
import { TimePicker24h } from '@/components/ui/fanat/time-picker';
import { Button } from '@/components/ui/fanat/button';
import {
    Calendar,
    ImagePlay,
    Clock,
    Tally5,
    Pin,
    X,
    Plus,
    User,
    MessageSquareMore,
    Repeat,BookImage
} from 'lucide-react';
import { SelectComponent } from '@/components/ui/fanat/select-component';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import EmojiPicker from 'emoji-picker-react';
import { TextareaDemo } from '@/components/ui/TextAreaWithEmoji';

const AddStory = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    return (
        <div className="flex flex-col sm:flex-row  gap-4 max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-4">
                <Card className="sm:w-[480px] p-4 flex flex-col gap-2 flex-grow h-full">
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
                        <MessageSquareMore className="w-4" />
                        Comment<span className="text-red">*</span>
                    </Label>
                    <Input id="picture" type="number" />
                        <Label className="flex gap-1 items-center">
                            <Calendar className="w-4" />
                            Start Date
                            <span className="text-red">*</span>
                        </Label>

                        <DateTimePicker24h date={date} setDate={setDate} />

                        <Label className="flex gap-1 items-center">
                            <Calendar className="w-4" />
                            End Date
                            <span className="text-red">*</span>
                        </Label>

                        <DateTimePicker24h date={date} setDate={setDate} />
                    <Label
                        className="flex gap-1 items-center"
                        htmlFor="picture"
                    >
                        <Clock className="w-4" />
                        Action duration<span className="text-red">*</span>
                    </Label>

                    <TimePicker24h />
                    <Label
                        className="flex gap-1 items-center  "
                        htmlFor="picture"
                    >
                        <Repeat className="w-4" />
                        Repeat times<span className="text-red">*</span>
                    </Label>
                    <Input id="picture" type="number" />
                    <Label
                        className="flex gap-2 items-center my-2"
                        htmlFor="terms"
                    >
                        <Checkbox id="terms" />
                        Pin to timeline
                    </Label>
                    <Label
                        className="flex gap-1 items-center "
                        htmlFor="picture"
                    >
                        <Pin className="w-4" />
                        Pin Place<span className="text-red">*</span>
                    </Label>
                    <Input id="picture" type="number" />
                    <div className="flex gap-4 mb-2">
                        <Label
                            className="flex gap-2 items-center mt-2"
                            htmlFor="terms"
                        >
                            <Checkbox id="terms" />
                            Permanent post
                        </Label>
                    </div>


                    <Label
                        className="flex gap-1 items-center"
                        htmlFor="picture"
                    >
                        {/*<User className="w-4" />*/}
                        Status<span className="text-red">*</span>
                    </Label>
                    <SelectComponent field="exampleField" />
                </Card>
            </div>
            <Card className="p-4 flex-grow flex flex-col gap-4 ">
                <Label className="flex items-center gap-2">
                    <BookImage className="w-4" />
                    Post
                </Label>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="rounded-lg max-w-full h-[200px] relative overflow-hidden ">
                            <X className="absolute top-2 right-2 w-6 h-6 bg-blue rounded-full p-1" />
                            <img
                                className="max-w-full max-h-full"
                                src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp"
                                alt=""
                            />
                        </div>
                        <SelectComponent
                            // field="rap"
                            fieldData={{
                                options: [
                                    {
                                        id: 'following',
                                        value: 'following',
                                        label: 'following',
                                    },
                                    {
                                        id: 'subscribed',
                                        value: 'subscribed',
                                        label: 'subscribed',
                                    },
                                ],
                            }}
                            defaultValue={'following'}
                        />
                    </div>
                    <div className="border p-4 border-border rounded-lg bg-blue cursor-pointer flex justify-center items-center">
                        <Plus className="!opacity-100" />
                    </div>
                </div>
                <TextareaDemo />
                <div className="mt-auto flex gap-4">
                    <Button className=" flex-grow">Add</Button>
                    <Button className="flex-grow">Add & New</Button>
                </div>
            </Card>


        </div>
    );
};

export default AddStory;
