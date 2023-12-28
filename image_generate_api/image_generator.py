import io
import base64

from diffusers import DiffusionPipeline
import torch

def generate_image(prompt):
    pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
    pipe.to("cuda")
    
    image = pipe(prompt=prompt).images[0]
    
    # 画像をBase64エンコード
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    return img_str