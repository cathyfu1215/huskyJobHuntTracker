import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import ItemsList from '../Components/ItemList'
import styles from '../styleHelper.js'
import { useEffect } from 'react'
import { Text } from 'react-native'

function JobApplicationRecords() {
    return(
    <SafeAreaView>
        <ItemsList/>
    </SafeAreaView>);
}

export default JobApplicationRecords
