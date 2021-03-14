import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import api, { key } from '../../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Conditions from '../../components/Conditions';

export default function Search() {
  const navigation = useNavigation();

  const [input, setInput] = React.useState('');
  const [city, setCity] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function handleSearch() {
    const response = await api.get(`/weather?key=${key}&city_name=${input}`);

    if (response.data.by === 'default') {
      setError('Humm, cidade não encontrada!');
      setInput('');
      setCity(null);
      Keyboard.dismiss();
      return;
    }
    setCity(response.data);
    setInput('');
    Keyboard.dismiss();
  }

  if (city) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name="chevron-left" size={32} color="#000" />
          <Text style={{ fontSize: 22 }}> Voltar</Text>
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <TextInput
            value={input}
            onChangeText={(valor) => setInput(valor)}
            placeholder="EX: Londrina, PR"
            style={styles.input}
          />

          <TouchableOpacity style={styles.icon} onPress={handleSearch}>
            <Feather name="search" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setCity(null)}
        >
          <AntDesign name="close" size={32} color="#000" />
        </TouchableOpacity>
        <LinearGradient style={styles.header} colors={['#1ed6ff', '#97c1ff']}>
          <Text style={styles.date}>{city.results.date}</Text>
          <Text style={styles.city}>{city.results.city_name}</Text>

          <View>
            <Text style={styles.temp}>{city.results.temp}º</Text>
          </View>

          <Conditions weather={city} />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="chevron-left" size={32} color="#000" />
        <Text style={{ fontSize: 22 }}> Voltar</Text>
      </TouchableOpacity>

      <View style={styles.searchBox}>
        <TextInput
          value={input}
          onChangeText={(valor) => setInput(valor)}
          placeholder="EX: Londrina, PR"
          style={styles.input}
        />

        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
          <Feather name="search" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
      {error && <Text style={{ marginTop: 25, fontSize: 18 }}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#E8F0FF',
  },
  backButton: {
    flexDirection: 'row',
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    flexDirection: 'row',
    marginRight: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  searchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDD',
    width: '90%',
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 7,
  },
  icon: {
    width: '15%',
    backgroundColor: '#1ED6FF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    marginTop: '5%',
    width: '90%',
    paddingTop: '5%',
    paddingBottom: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  date: {
    color: '#FFF',
    fontSize: 16,
  },
  city: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  temp: {
    color: '#FFF',
    fontSize: 90,
    fontWeight: 'bold',
  },
});
