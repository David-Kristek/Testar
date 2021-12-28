import { StyleSheet } from "react-native";

export default StyleSheet.create({
    navigate: {
        padding: 5,
        paddingTop: 8,
        color: "blue",
        textDecorationLine: "underline",
      },
      loginScreenContainer: {
        flex: 1,
        height: "100%",
        padding: "10%",
        paddingVertical: "30%",
        // justifyContent: "center"
      },
      logoBox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10%",
        paddingBottom: "3%",
      },
      logoText: {
        fontSize: 40,
        fontWeight: "800",
        paddingLeft: 10,
      },
      loginFormView: {
        flex: 1,
        marginBottom: 150,
      },
      loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#eaeaea",
        backgroundColor: "#fafafa",
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
      },
      loginButton: {
        backgroundColor: "#3897f1",
        borderRadius: 5,
        height: 45,
        marginTop: 10,
      },
      label: {
        fontSize: 16,
        paddingTop: 10,
      },
      error: {
        color: "red",
      },
      alert: {
        backgroundColor: "limegreen",
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 15,
        borderRadius: 20,
        color: "black",
        textAlign: "center",
      },
})