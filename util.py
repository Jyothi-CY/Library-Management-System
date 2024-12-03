import json

# Load the data from the JSON file
with open('booksc.json', 'r') as file:
    data = json.load(file)

# Add "available": "true" to all documents
for document in data:
    document['queries'] = []
    document['available'] = "true"
    document['borrower'] = "false"
    document['subject'] = "Crime"
    document['title'] = document['book_title']

    del document['image']
    del document['content']
    del document['book_title']


    

    

# Write the modified data back to the JSON file
with open('booksc.json', 'w') as file:
    json.dump(data, file, indent=4)