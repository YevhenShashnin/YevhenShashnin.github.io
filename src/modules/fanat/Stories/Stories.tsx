import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/fanat/tabs';
import { Card } from '@/components/ui/fanat/card';
import  {CirclePlus } from 'lucide-react';

const Stories = () => {
    return (
        <div >
            <Tabs defaultValue="account" >
                <TabsList className="grid w-full gap-4 grid-cols-3 mb-6">
                    <TabsTrigger value="previous">Previous</TabsTrigger>
                    <TabsTrigger value="now">Relevant</TabsTrigger>
                    <TabsTrigger value="future">Planned</TabsTrigger>
                </TabsList>
                <TabsContent value="previous">
                    <div className='grid grid-cols-4 gap-4'>
                        <Card className=''>
                            <img className='rounded-lg ' src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp" alt=""/>
                        </Card>
                        <Card className=''>
                            <img className='rounded-lg' src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp" alt=""/>
                        </Card>
                        <Card className=''>
                            <img className='rounded-lg' src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp" alt=""/>
                        </Card>
                        <Card className=''>
                            <img className='rounded-lg' src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp" alt=""/>
                        </Card>
                        <Card className=''>
                            <img className='rounded-lg' src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp" alt=""/>
                        </Card>
                        <Card className=''>
                            <img className='rounded-lg' src="https://i.ebayimg.com/images/g/0koAAOSwej5kYzdS/s-l1600.webp" alt=""/>
                        </Card>

                        <Card className='h-full flex justify-center items-center flex-col'>
                            <CirclePlus className='w-10 h-10 mb-2'/>
                            add new
                        </Card>
                    </div>

                </TabsContent>
                <TabsContent value="now">
                    now
                </TabsContent>
                <TabsContent value="future">
                    future
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Stories;