import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Oops from "./Oops";
import Prefrences from "./Prefrences";
import Prefrences2 from "./Prefrences2";
import Prefrences3 from "./Prefrences3";
import { Text } from "../../../../DefaultFont";

const PrefrencesWrapper = () => {
    const [view, setView] = useState("allergies")
    return <SafeAreaView>
        {{
            "allergies": <Prefrences setView={setView} />,
            "lifestyle": <Prefrences2 setView={setView}/>,
            "dontwant": <Prefrences3 setView={setView}/>,
            "Oops": <Oops setView={setView}/>,
        }[view]}
    </SafeAreaView>
}
export default PrefrencesWrapper;