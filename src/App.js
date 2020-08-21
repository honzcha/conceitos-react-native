import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/like`);

    const newRepos = repos.map((reposit) => {
      if (reposit.id === id) {
        reposit.likes += 1;
      }
      return reposit;
    });

    setRepos(newRepos);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.repositoryContainer}
          data={repos}
          keyExtractor={(reposit) => reposit.id}
          renderItem={({ item: reposit }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{reposit.title}</Text>

              <View style={styles.techsContainer}>
                {reposit.techs.map((tech) => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${reposit.id}`}
                >
                  if {reposit.likes} > 1 {`${reposit.likes} curtidas`}{" "}
                  {reposit.likes}
                  curtida
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(reposit.id)}
                testID={`like-button-${reposit.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
