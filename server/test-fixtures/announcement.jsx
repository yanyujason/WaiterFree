if (process.env.IS_MIRROR) {
    console.log("It's really weird writing test fixtures in this /server folder, " +
    "but it seems to be the only way to provide fixture data for client integration test. " +
    "Please endure this until we can find a better way.");
}
