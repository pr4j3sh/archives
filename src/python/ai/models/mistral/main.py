from mlx_lm import load

# Load the model and tokenizer
model, tokenizer = load("mlx-community/Mistral-Large-Instruct-2407-bf16")

# Access the model's configuration
n_layers = (
    model.config.num_hidden_layers
)  # or model.config.n_layers depending on the model implementation

print(f"Number of layers: {n_layers}")
