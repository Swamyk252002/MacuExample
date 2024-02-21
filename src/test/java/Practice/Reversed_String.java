package Practice;

public class Reversed_String {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s= "Swamy";
		String r="";
		for(int i=s.length()-1;i>=0;i--) {
			
			char c=s.charAt(i);
			r=r+c;
		}
		System.out.println(s);
		System.out.println(r);
	}

}
