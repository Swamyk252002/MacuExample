package Practice;

public class Reverse_String {

	public static void main(String[] args) {
		String s="this is swamy";
		char[] c=s.toCharArray();
		String r="";
		for(int i=c.length-1;i>=0;i--) {
			r=r+c[i];
		}
        System.out.println(r);
	}

}
