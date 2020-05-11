from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')

def index():
    return render_template('index.html') 

@app.route('/about')
def about(): 
    return "This sisdfasdfklasndflk nadslk "

@app.route('/contact')
def contact(): 
    return 'sdfdsf'
    
@app.route('/test')
def someUrl():
    my_dict = {'title': 'Bayside', "colour" : "green"}
    return json.dumps(my_dict)

if __name__ == '__main__':
    app.run(debug=True)


