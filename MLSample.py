# This file is a file to trail an AI model to convert 3D Cords into 2D cords
# A mathmatical project could be used but I am not sure how to do that

# Noah Robitshek Summer 2024



import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Example data
# 3D points (x, y, z) and their corresponding 2D projections (x', y')
X_train = np.array([
    [10, 15, 50],
    [20, 30, 60],
    [30, 45, 70],
    # Add more training data
])
y_train = np.array([
    [5, 7],
    [10, 15],
    [15, 22],
    # Add more training data
])

# Define a simple neural network model
model = Sequential([
    Dense(64, activation='relu', input_shape=(3,)),
    Dense(64, activation='relu'),
    Dense(2)
])

# Compile the model
model.compile(optimizer='adam', loss='mse')

# Train the model
model.fit(X_train, y_train, epochs=100)

# Predict 2D points for new 3D points
X_new = np.array([
    [25, 35, 55],
    [40, 50, 80]
])
y_pred = model.predict(X_new)
print("Predicted 2D points:", y_pred)