import boto3

kms_client = boto3.client('kms', region_name='eu-west-2')

# The ID or ARN of your KMS key 
key_id = 'arn:aws:kms:eu-west-2:314146339647:key/80663450-bfb1-4628-bedb-add02030dba0'

# Data to be encrypted
plaintext = 'This is a secret message\n'

response = kms_client.encrypt(
    KeyId=key_id,
    Plaintext=plaintext,
    EncryptionAlgorithm='SYMMETRIC_DEFAULT'
)

ciphertext_blob = response['CiphertextBlob']

# Save the encrypted data to a file
with open('encrypted_data.txt', 'wb') as encrypted_file:
    encrypted_file.write(ciphertext_blob)

print('Encrypted data saved to "encrypted_data.txt" file.')

decrypt_response = kms_client.decrypt(
    CiphertextBlob=ciphertext_blob,
    KeyId=key_id
)

# Get the plaintext back
decrypted_plaintext = decrypt_response['Plaintext'].decode('utf-8')

# Save the decrypted data to a file
with open('decrypted_data.txt', 'w') as decrypted_file:
    decrypted_file.write(decrypted_plaintext)

print('Decrypted data saved to "decrypted_data.txt" file.')