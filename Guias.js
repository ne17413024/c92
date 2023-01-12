import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import db from "../config";
import { Directions } from "react-native-gesture-handler";

export default class Guias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      searchText: ""
    };
  }
  componentDidMount = async () => {
    this.getTransactions();
  };

  getTransactions = () => {
    db.collection("transactions")
      .limit(10)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState({
            allTransactions: [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction: doc
          });
        });
      });
  };

  handleSearch = async Text => {
    var enteredText = Text.toUpperCase().split("");
    Text = Text.toUpperCase();
    this.setState({
      allTransactions: []
    });
    if (!Text) {
      this.getTransactions();
    }

    if (enteredText[0] === "B") {
      db.collection("transactions")
        .where("book_id", "==", Text)
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            this.setState({
              allTransactions: [...this.state.allTransactions, doc.data()],
              lastVisibleTransaction: doc
            });
          });
        });
    } else if (enteredText[0] === "S") {
      db.collection("transactions")
        .where("student_id", "==", Text)
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            this.setState({
              allTransactions: [...this.state.allTransactions, doc.data()],
              lastVisibleTransaction: doc
            });
          });
        });
    }
  };

  fetchMoreTransactions = async Text => {
    var enteredText = Text.toUpperCase().split("");
    Text = Text.toUpperCase();

    const { lastVisibleTransaction, allTransactions } = this.state;
    if (enteredText[0] === "B") {
      const query = await db
        .collection("transactions")
        .where("bookId", "==", Text)
        .startAfter(lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map(doc => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        });
      });
    } else if (enteredText[0] === "S") {
      const query = await db
        .collection("transactions")
        .where("bookId", "==", Text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map(doc => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        });
      });
    }
  };

  renderItem = ({ item, i }) => {
    var date = item.date
      .toDate()
      .toString()
      .split(" ")
      .splice(0, 4)
      .join(" ");

    var transactionType =
      item.transaction_type === "issue" ? "issued" : "returned";
    
  };

  render() {
    
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} /> 
        <TouchableOpacity style={styles.TopButton} > 
          <Text style={styles.TextButton} > + </Text> 
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.GuiaButton} > 
            <Text style={styles.GuiatextButton} > Guias 1 </Text> 
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  TopButton: {
    height: 85,
    width: '100%',
    
    backgroundColor:'#38B6FF',
    
  },
  TextButton: {
    fontSize:80,
    fontWeight:'bold',
    marginLeft:'75%'
  },
  GuiaButton: {
    marginTop:'2%',
    marginLeft:'5%',
    marginRight:'5%',
    backgroundColor:'#A6A6A6',
    borderRadius:80
  },
  GuiatextButton: {
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center'
  },
  droidSafeArea: {
    marginTop: Platform.OS=== "android"? StatusBar.currentHeight: 0
  },
  
});
