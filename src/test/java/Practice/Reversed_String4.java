package Practice;

public class Reversed_String4 {

	public static void main(String[] args) {
		String s="this is swamy kalaveni";
		
		String[] s1=s.split(" ");
		String s3="";
		String s4="";
		for(int i=0;i<s1.length;i++) {
			String s2=s1[i];
			System.out.println(s2);
			for(int j=s2.length()-1;j>=0;j--) {
			      s3=s3+s2.charAt(j);	
			}
		    s4=s4+s3+" ";	
		    s3="";
		}
		System.out.println(s4);
	}
	
}
