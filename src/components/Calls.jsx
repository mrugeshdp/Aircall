import React, { useState } from 'react'
import CallMissedIcon from '@mui/icons-material/CallMissed';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import moment from 'moment';
import axios from 'axios';

const CallDetails = ({ callDetail }) => {
    return (
        <div>
            <div className='timeDiv'>
                <span>{moment(callDetail.created_at).format("MMMM, DD YYYY")}</span>
            </div>
            <div className="callDiv">
                <div className="callImageDiv">
                    {callDetail.call_type === "missed" && <CallMissedIcon />}
                    {callDetail.call_type === "voicemail" && <VoicemailIcon />}
                    {callDetail.call_type === "answered" && <CallReceivedIcon />}
                </div>
                <div className="callDetailDiv">
                    <div className="callFrom">{callDetail.from}</div>
                    <div className="callToText">tried to call on <span className='callTo'>{callDetail.to}</span></div>
                </div>
                <div className='callTimeDiv'>
                    <span className='callTimeSpan'>{moment(callDetail.created_at).format("hh:mm")}</span>
                    <span className='callTimeAMPMSpan'>{moment(callDetail.created_at).format("A")}</span>
                </div>
            </div>
        </div>
    )
}


const Calls = ({ activeCalls, setActiveCalls, activeTab }) => {
    const [error, setError] = useState("")
    const archiveAll = () => {
        const base_url = "https://cerulean-marlin-wig.cyclic.app/activities"
        activeCalls.map((call, index) => !call.is_archived && axios.patch(`${base_url}/${call.id}`, {
            "is_archived": true
        }).then((res) => {
            if (res.data === "Call had been updated.") {
                call.is_archived = true
            }
        }).catch((error) => setError(error.message)))
    }

    return (
        <div>
            {error && (<span>{error}</span>)}
            <div className='archiveButton' onClick={() => archiveAll()}>
                <div className='archiveIcon'>
                    <Inventory2OutlinedIcon className='iconColor' />
                </div>
                <div className='archiveText'>Archive All Calls</div>
            </div>
            <div>
                {activeCalls && activeCalls.map((call) =>
                    activeTab === "inbox" ?
                        !call.is_archived && (
                            <CallDetails callDetail={call} />
                        ) : (<CallDetails callDetail={call} />)
                )}
            </div>
        </div>
    )
}



export default Calls