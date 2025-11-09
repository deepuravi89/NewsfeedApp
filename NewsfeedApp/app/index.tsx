import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

type Article = {
  url: string;
  title: string;
  description: string;
};

export default function IndexScreen() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=XXXX')
      .then(response => response.json())
      .then(json => {
        setNews(json.articles);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  }

  return (
    <FlatList
      data={news}
      keyExtractor={item => item.url}
      renderItem={({ item }: { item: Article }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontWeight: 'bold', marginBottom: 5 },
});
