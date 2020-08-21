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
    // Implement "Like Repository" functionality
    api.put(`repositories/${id}`);
    // console.log(id);
    const projectIndex = repos.findIndex((project) => project.id === id);

    // if (projectIndex < 0) {
    //   return repos.status(400).json({ error: "Id not found" });
    // }
    repos[projectIndex].likes += 1;

    setRepos(repos);
    // console.log(repos[projectIndex]);
  }

  // const Item = ({ title, techs, likes, repos: repos }) => (
  //   <View style={styles.repositoryContainer}>
  //     <Text style={styles.repository}>{title}</Text>
  //     {repos.map((repo) => (
  //       <Text style={styles.tech} key={repo.id}>
  //         {repo.techs}
  //       </Text>
  //     ))}
  //     <Text style={styles.project}>{likes}</Text>
  //   </View>
  // );

  // const renderItem = ({ item }) => (
  //   <Item title={item.title} likes={item.likes} />
  // );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repos.map((repo) => (
          <>
            <View style={styles.repositoryContainer}>
              <View>
                <Text style={styles.repository} key={repo.id}>
                  {repo.title}
                </Text>
              </View>
              <FlatList
                data={repo}
                style={styles.techsContainer}
                keyExtractor={(project) => project.id}
                renderItem={({ item }) => (
                  <Text style={styles.tech}>{item.techs}</Text>
                )}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(1)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-${repository.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </>
        ))}
        {/* <Text style={styles.repository}>Repository 1</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>ReactJS</Text>
            <Text style={styles.tech}>Node.js</Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity> */}
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
