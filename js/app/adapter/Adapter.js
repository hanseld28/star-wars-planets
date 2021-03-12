class Adapter {

    static adapt(typeClass, method) {
        const model = new typeClass();
        return method(model);
    }
}