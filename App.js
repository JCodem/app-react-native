import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Appbar, Text, List, DefaultTheme } from 'react-native-paper';
import {Image} from 'react-native';

const Stack = createStackNavigator();

const items = [
  { id: '1', title: 'GOT' },
  { id: '2', title: 'FRIENDS' },
  { id: '3', title: 'PEAKY BLINDERS' },
  { id: '4', title: 'GREYS ANATOMY' },
  { id: '5', title: 'DR. HOUSE' },
  { id: '6', title: 'LA CASA DEL DRAGON' },
  // Añade más elementos según sea necesario
];

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#f0f0f0',
    placeholder: '#a0a0a0',
    backdrop: '#000000',
    notification: '#f50057',
  },
};

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#808080' }}>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.title}>Cartelera</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { title: item.title })}>
              <List.Item
                title={item.title}
                titleStyle={styles.listItem}
                style={styles.listItemContainer}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}


function ItemDetailsScreen({ route, navigation }) {
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Details" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {title === 'GOT' && (
          <Image
            source={require('./assets/GOT.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  listItem: {
    fontSize: 18,
  },
  listItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  image: {
    width:150,
    height:222,
    marginTop:20,
    
  }

});
