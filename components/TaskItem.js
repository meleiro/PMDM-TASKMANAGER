import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskItem({item, onToggle}) {

    return (

        <TouchableOpacity onPress={ () => onToggle(item.id)}>

            <View style={[styles.item, item.done && styles.itemDone]}>

                <Text style={[styles.text, item.done && styles.textDone]}>
                        {item.text}
                </Text>

            </View>
        </TouchableOpacity>
    );
}
