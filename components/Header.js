import React from 'react';


import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {


    return (


        <View style={styles.container}>


            <Image

                source={require('../assets/logo.png')}

                style={styles.logo}

                resizeMode="contain"
            />

            <Text style={styles.title}>Aplicasau de Tarefas</Text>

            <Text style={styles.subtitle}>Lista de tarefas e consumo de coca</Text>

        </View>


    );


}


const styles = StyleSheet.create({

    container: {

        alignItems: 'center',
        paddingVertical: 24,
        gap: 4,


    },

    logo: {
        width: 80,
        height: 80,
        marginBottom: 8,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
    },


    subtitle: {
        fontSize: 14,
        color: '#555'

    },



});

