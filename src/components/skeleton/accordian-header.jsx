import { Skeleton } from "antd";
import AccordionHeaderSkeleton from "@/fakeskeleton/skeleton/accordion-header";
//create a skeleteon for the accordian header
const AccordianHeaderSkeleton = () => {
    return (<div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '1px solid #d9d9d9',
        }}>
            <Skeleton.Avatar size='small' shape='square'/>
            <Skeleton.Input size='small' block style={{ height: '22px' }}/>
        </div>);
};
export default AccordionHeaderSkeleton;
