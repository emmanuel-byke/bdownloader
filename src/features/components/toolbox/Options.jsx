import { Plus, Settings } from "lucide-react";
import { Item } from "../../cards/Item";
import { MdCleanHands } from "react-icons/md";
import { useState } from "react";
import { Popup } from "../../widgets/Popup";
import { URLCard } from "../../cards/URLCard";




export const Options = () => {
    const [showURL, setShowURL] = useState(false);
    return(
        <div className="flex flex-row gap-3">
            <Item title='Add URL' Icon={Plus} onClick={()=>setShowURL(true)} />
            <Item title='Settings' Icon={Settings} />
            <Item title='Clean' Icon={MdCleanHands} />

            <Popup isOpen={showURL} onClose={()=>setShowURL(false)} hideCloseBtn>
                <URLCard />
            </Popup>
        </div>
    );
}

